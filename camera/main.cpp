/*
sources :
http://docs.opencv.org/trunk/doc/tutorials/video/background_subtraction/background_subtraction.html
http://www.geckogeek.fr/lire-le-flux-dune-webcam-camera-video-avec-opencv.html
http://fr.openclassrooms.com/informatique/cours/introduction-a-la-vision-par-ordinateur/une-interface-simple-mais-pratique
http://www.esiee.fr/~kachourr/Page_web/Enseignement/2012_2013/EL5E13/RK_EL5E13-TP3&4_2012-13
tuto personnel d'utilisation d'OpenCV


http://opencv-users.1802565.n2.nabble.com/cvCreateImage-td2629358.html
http://stackoverflow.com/questions/8243378/opencv-video-frame-giving-me-an-error
http://sarah-sarahel.blogspot.fr/2012/05/detection-des-changements-entre-deux.html
http://fr.openclassrooms.com/informatique/cours/introduction-a-la-vision-par-ordinateur/la-structure-iplimage
http://fr.openclassrooms.com/informatique/cours/introduction-a-la-vision-par-ordinateur/parcourir-une-image
http://code.opencv.org/projects/opencv/repository/revisions/master/entry/samples/c/motempl.c
http://www.google.fr/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CDUQFjAA&url=http%3A%2F%2Flinuxclg.com%2Ffiles%2FReconnaissance%2520de%2520forme_ver2.odt&ei=UfFXU7egIs3a0QWQtoGABQ&usg=AFQjCNG8-FHjz_sdT-tT-v6GF-WI0X29JA&bvm=bv.65177938,d.d2k
http://stackoverflow.com/questions/5951292/how-do-you-delete-a-cvseq-in-opencv
*/

//opencv
#include <opencv2/highgui/highgui.hpp>
#include "opencv/cv.h"

//C
#include <stdio.h>

//C++
#include <iostream>
#include <sstream>


using namespace cv;
using namespace std;

void LandscapeDefine(IplImage* im) /*captures a still to be used during area definition*/
{
    cvSaveImage("/home/caro/Documents/IoT/landscape.jpg", im);
}


int IsActivity (IplImage* im)
{
    int l, c;
    long int whitePix =0;
    long int threshold = 10; //defined if there is enought activity to consider having a person

    for (l=0; l<im->height; l++)
    {
        for (c=0; c<im->width; c++)
        {
            if (*(cvPtr2D(im, l, c, NULL))==255)
                whitePix++;

        }
    }
    if (whitePix>=threshold)
        return 1;
    return 0;
}

void detection_mouvement (IplImage* actu, IplImage* prec, IplImage* area,IplImage* diff)
{
    /*In this greyscale format, there is one char per pixel. The more the pixel is bright the more value is high*/

    int l, c;
    int threshold=25;
    int color1, color2;
    int isInArea;

    cvZero(diff);

    for (l=0; l<diff->height; l++)
    {
        for (c=0; c<diff->width; c++)
        {
            color1 = (int)*cvPtr2D(prec, l, c, NULL);
            color2 = (int)*cvPtr2D(actu, l, c, NULL);
            isInArea = (int)*cvPtr2D(area, l, c, NULL); //black(0) and white(255) picture

            if (isInArea && abs(color1-color2)>threshold)
                {
                    *(cvPtr2D (diff, l, c, NULL))=255;
                }

        }
    }
}

int main()
{

    //DECLARATIONS
    CvCapture* webcam=NULL;
    IplImage *temp=NULL, *still_current=NULL, *still_previous=NULL, *difference=NULL, *area=NULL;
    int ouverture;
    char touche='0';
    const char* chemin = "/home/caro/Vidéos/test3.mp4";
    int loopCpt=0;

    //TRAITEMENTS
    //Overview (do be removed for real usage)
    webcam = cvCreateFileCapture(chemin);
    //should be changed into the following for real utilisation
    //webcam = cvCreateCameraCapture( CV_CAP_ANY );
    ouverture=cvNamedWindow ("t1", CV_WINDOW_AUTOSIZE);

    //Failure shooting
    if (webcam==NULL)
    {
        printf("Error in video strem opening\n");
        return 1;
    }

    else
    {
        temp = cvQueryFrame(webcam);
        still_current = cvCreateImage(cvSize(temp->width,temp->height), IPL_DEPTH_8U, 1);
        still_previous = cvCreateImage(cvSize(temp->width,temp->height), IPL_DEPTH_8U, 1);
        difference = cvCreateImage(cvSize(temp->width,temp->height), IPL_DEPTH_8U, 1);
        cvZero(difference);

        area=cvLoadImage("/home/caro/Documents/IoT/selectedarea.jpg", 1);

        //Surveillance loop
        while (1)
        {
            //pictures extractif from stream
            still_previous=cvCloneImage(still_current);
            temp = cvQueryFrame(webcam);
            cvCvtColor( temp, still_current, CV_RGB2GRAY);

            detection_mouvement(still_current, still_previous, area, difference);
            cvErode(difference, difference, NULL, 1);

            if (loopCpt == 0)
            {
                if (IsActivity(difference))
                    printf("Activity in stairs\n");
                else
                    printf("No activity\n");
            }

            cvShowImage("t1",still_current);
            cvReleaseImage(&still_previous);
            cvWaitKey(10);
            loopCpt=(loopCpt+1)%5;
        }

        cvReleaseImage(&still_current);
        cvReleaseImage(&temp);
        cvReleaseImage(&difference);
        cvReleaseCapture(&webcam);
        cvDestroyAllWindows();
    }

    return 0;
}
