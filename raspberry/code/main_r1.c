#include <stdio.h>
#include <stdlib.h>
FILE* f_in=NULL;
FILE* f_out=NULL;
char chaine [200];
char c;
char tampon=1;
int i=0;

int main()
{
    f_in=fopen("airo-01.csv", "r");
    f_out=fopen("file_out_r1.txt", "w");

    if(f_in==NULL)
        return 666;
    while (fscanf(f_in, "%c", &c)!= EOF)
    {
        if (c=='S' && tampon=='\n'){
             break;
        }
        tampon = c;
    }

    fscanf(f_in, "tation MAC, First time seen, Last time seen, Power, # packets, BSSID, Probed ESSIDs");
    while (fscanf(f_in, "%s", chaine)!= EOF)
    {

        for (i=0; i<17; i++)
             fprintf(f_out, "%c", chaine[i]);
        fprintf (f_out, " ");
        fscanf(f_in, "%s", chaine);
        fscanf(f_in, "%s", chaine);
        fscanf(f_in, "%s", chaine);
        fscanf(f_in, "%s", chaine);
        fscanf(f_in, "%s", chaine);
        for (i=0; i<4; i++)
        {
            if (chaine[i]==',')
                break;
            else fprintf(f_out, "%c", chaine[i]);
        }
        while (fscanf(f_in, "%c", &c)!=EOF)
            if (c=='\n')
                break;
       fprintf(f_out, "\n");
    }
    fclose(f_in);
    fclose(f_out);
    return 0;
}