#include "opencv2/opencv.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/core/core.hpp"

#include <iostream>
#include <map>
#include <string>
#include <list>
 
using namespace std;
using namespace cv;
 

Mat morphologicalOpeningClosing(Mat imgThresholded){
	//morphological opening
	erode(imgThresholded, imgThresholded, getStructuringElement(MORPH_ELLIPSE, Size(5, 5))); //pequenos buracos e intrusões são preenchidas
	dilate(imgThresholded, imgThresholded, getStructuringElement(MORPH_ELLIPSE, Size(5, 5))); //buracos são aumentados e extrusões são eliminadas
	//como é usado um elemento estruturante eliptico os contornos do objeto sao suavizados e são eliminadas pequenas protuberâncias


	//morphological closing 
	dilate(imgThresholded, imgThresholded, getStructuringElement(MORPH_ELLIPSE, Size(5, 5))); 
	erode(imgThresholded, imgThresholded, getStructuringElement(MORPH_ELLIPSE, Size(5, 5)));
	
	
	return imgThresholded;
}


int main(){
 
  // Create a VideoCapture object and open the input file
  // If the input is the web camera, pass 0 instead of the video file name
  VideoCapture cap(0); 
  map <int,list<int> > keyValueNumbers;
  keyValueNumbers.insert(make_pair<int,list<int> > (0,{1,1,1,1,1,1,0}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (1,{0,1,1,0,0,0,0}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (2,{1,1,0,1,1,0,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (3,{1,1,1,1,0,0,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (4,{0,1,1,0,0,1,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (5,{1,0,1,1,0,1,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (6,{1,0,1,1,1,1,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (7,{1,1,1,0,0,0,0}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (8,{1,1,1,1,1,1,1}) );
  keyValueNumbers.insert(make_pair<int,list<int> > (9,{1,1,1,1,0,1,1}) );
  
  map <string,list<int> > keyValueOperators;
  keyValueOperators.insert(make_pair<string,list<int> > ("+",{1,0,1,0,1,0,1,0}) );
  keyValueOperators.insert(make_pair<string,list<int> > ("-",{0,0,1,0,0,0,1,0}) );
  keyValueOperators.insert(make_pair<string,list<int> > ("*",{1,1,1,1,1,1,1,1}) );
  keyValueOperators.insert(make_pair<string,list<int> > ("/",{0,1,0,0,0,1,0,0}) );
  
 /*
  vector<string> retval;
  for (auto const& element : keyValueOperators) {
    retval.push_back(element.first);
  }

  for( string key : retval){
    cout << key << endl;

  } */
    
  // Check if camera opened successfully
  if(!cap.isOpened()){
    cout << "Error opening video stream or file" << endl;
    return -1;
  }
     
  while(1){
 
    Mat frame;
    Mat framet;
   
    // Capture frame-by-frame
    cap >> frame;
  
    // If the frame is empty, break immediately
    if (frame.empty())
      break;
 
    // Display the resulting frame
    imshow( "Frame", frame );
    
    
    double thresh = 80;
    double maxValue = 255; 
    
    namedWindow( "Frame", WINDOW_AUTOSIZE );

    
    cvtColor( frame, frame, COLOR_BGR2GRAY );
    blur( frame, frame, Size(3,3) );
    // Binary Threshold
    threshold(frame,framet, thresh, maxValue, THRESH_BINARY );
    framet = morphologicalOpeningClosing(framet); //Operaçoes Morfologicas de opening e closing para eliminar gaps

    
    Mat canny_output;
    vector<Vec4i> hierarchy;
    vector<vector<Point> > contours;
    
    /// Detect edges using canny
    Canny( framet, canny_output, thresh, thresh*2, 3 );
    /// Find contours
    findContours( canny_output, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE , Point(0, 0) );
    for(int i =0 ;i< contours.size();i++){
      cout << contours[i] << endl;
    }
    Mat drawing = Mat::zeros( canny_output.size(), CV_8UC3 );
   
    vector<vector<Point> > contours_poly( contours.size() );
    vector<Rect> boundRect( contours.size() );
    
    for( size_t i = 0; i < contours.size(); i++ )
    {
        approxPolyDP( contours[i], contours_poly[i], 3, true );
        boundRect[i] = boundingRect( contours_poly[i] );
    }

    for( size_t i = 0; i< contours.size(); i++ )
    {
        drawContours( drawing, contours, (int)i, Scalar(0, 255, 0 ), 2, LINE_8, hierarchy, 0 );
        rectangle( drawing, boundRect[i].tl(), boundRect[i].br(), Scalar(255, 0, 0 ), 2 );

    }

    for( Rect r : boundRect)
    {
      cout << r << endl;
    }

    
    imshow( "Contours", drawing );
   
    // Press  ESC on keyboard to exit
    char c=(char)waitKey(25);
    if(c==27)
      break;
  }
  
  // When everything done, release the video capture object
  cap.release();
 
  // Closes all the frames
  destroyAllWindows();
     
  return 0;
}