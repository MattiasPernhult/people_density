#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#define R1 "file_out_r1.txt"
#define R2 "file_out_r2.txt"
#define R3 "file_out_r3.txt"
#define COORD "coord.txt"
#define RES "result.txt"

#define MIN -90
#define MAX -15
#define NOMBRE_RASP 3


typedef struct cases t_case;

struct cases
{
    char mac [18];
    int force[3];
    int x,y,z;
    t_case* next;
    t_case* prev;
};

FILE* fr1=NULL;
FILE* fr2=NULL;
FILE* fr3=NULL;
FILE* fc=NULL;
FILE* res=NULL;
int R12=0;
int R13=0;
int R23=0;

int A=0;
int B=0;
int C=0;

t_case* ancre = NULL;
t_case* ancre_fin = NULL;

t_case* init_case(int r, char mac[18], int force)
{
    t_case* tmp;
    int i;
    if (force==-1)
	force =0;
    tmp = (t_case*)malloc(sizeof(t_case));
    for (i=0 ; i<18 ; i++)
        tmp->mac [i]=0;
    for (i=0 ; i<3 ; i++)
        tmp->force[i]=0;
    tmp->next=NULL;
    tmp->prev=NULL;
    for (i=0 ; i<18 ; i++)
        tmp->mac[i]= mac[i];
    tmp->force[r]=force;

    tmp->x=0;
    tmp->y=0;
    tmp->z=0;
    return tmp;
}

int open_file ()
{

    FILE* f=NULL;

    fr1=fopen(R1,"r");
    if (!fr1)
        return 6661;
    fr2=fopen(R2,"r");
    if (!fr2)
        return 6662;
    fr3=fopen(R3,"r");
    if (!fr3)
        return 6663;
    res=fopen(RES, "w");
    if (!res)
        return 6665;
    return 0;
}

void maj (FILE* f, int r)
{
    char tampon[18];
    int force;
    int out=0;
    int i;
    t_case* tmp=NULL;
    while (fscanf(f, "%s", tampon)!=EOF)
    {
        //printf("%s ",tampon);
        fscanf(f, "%d", &force);
	//printf("%d\n",force);
        tmp=ancre;
	out=0;
	printf (".");
	while (tmp && !out)
	{
	    if (tmp->mac && !strcmp(tampon, tmp->mac))
		out=1;
	    else tmp = tmp->next;
	}
        if (!tmp)
        {
            if (ancre_fin)
            {
                ancre_fin->next=init_case(r, tampon, force);
                ancre_fin->next->prev=ancre_fin;
                ancre_fin=ancre_fin->next;
            }
            else
            {
                ancre=init_case(r, tampon, force);
                ancre_fin=ancre;
            }
        }
        else
        {
	    tmp->force[r]=force;
        }
    }
}

int is_excluded(t_case* tmp)
{
    int i, r, x;

    x=0;
    r=0;
    for (i=0 ; i<3 ; i++)
    {
        if (tmp->force[i])
            r++;
    }
    if (r<2)
        x=1;
    return x;
}

void cleaning ()
{
    t_case* tmp;
    t_case* tmp2;
    tmp=ancre;
    while (tmp)
    {
        tmp2 = tmp->next;
        if(is_excluded(tmp))
        {
            if(tmp->prev)
                tmp->prev->next=tmp->next;
            else ancre=tmp->next;
            if (tmp->next)
                tmp->next->prev = tmp->prev;
            else ancre_fin = tmp->prev;
            free(tmp);
        }
        tmp=tmp2;
    }
}

int prc (int pw)
{
    if (pw==-1 || !pw)
        return 0;
    return (pw+MIN)/(MIN-MAX)*100;
}

int max (int i, int j, int k)
{
    if (i>=j && i>=k)
        return i;
    if (j>=k && j>=i)
        return j;
    if (k>=i && k>=j)
        return k;
}

int min (int i, int j, int k)
{
    if (i<=j && i<=k)
        return i;
    if (j<=k && j<=i)
        return j;
    if (k<=i && k<=j)
        return k;
}

void writing_tab ()
{
    t_case* tmp;
    tmp=ancre;

    while (tmp)
    {
        //printf("%s\tpower : %d %d %d\tcoord : %d %d %d\n",tmp->mac, tmp->force[0], tmp->force[1], tmp->force[2], tmp->x, tmp->y, tmp->z);
        //fprintf(res,"%s\tpower : %d %d %d\tcoord : %d %d %d\n",tmp->mac, tmp->force[0], tmp->force[1], tmp->force[2], tmp->x, tmp->y, tmp->z);
        ///fprintf(res,"%s %d %d %d\n",tmp->mac, tmp->force[0], tmp->force[1], tmp->force[2]);
	if (abs(tmp->force[0]) == max(abs(tmp->force[0]), abs(tmp->force[1]), abs(tmp->force[2])))
	    A++;
	else if (abs(tmp->force[1]) == max(abs(tmp->force[0]), abs(tmp->force[1]), abs(tmp->force[2])))
            B++;
	else if (abs(tmp->force[2]) == max(abs(tmp->force[0]), abs(tmp->force[1]), abs(tmp->force[2])))
            C++;
        tmp=tmp->next;
    }
    fprintf(res,"A : %d\nB : %d\nC : %d",A,B,C);
}

int main()
{
    int i;
    i=open_file();
    if (i)
        return i;

    maj(fr1,0);
    maj(fr2,1);
    maj(fr3,2);

    cleaning();
    //calculate();
    writing_tab();
    return 0;
}