#include "opencv2/opencv.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/core/core.hpp"

#include <iostream>
 
using namespace std;
using namespace cv;
 
int main(){
 
  // Create a VideoCapture object and open the input file
  // If the input is the web camera, pass 0 instead of the video file name
  VideoCapture cap(0); 
  
    
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