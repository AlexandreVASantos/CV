#include "opencv2/opencv.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/core/core.hpp"
#include <stdlib.h>   
#include <iostream>
#include <map>
#include <string>
#include <list>
 
using namespace std;
using namespace cv;
 

Mat morphologicalOpeningClosing(Mat imgThresholded){

	//morphological closing 
	dilate(imgThresholded, imgThresholded, getStructuringElement(MORPH_RECT, Size(5, 5))); 
	erode(imgThresholded, imgThresholded, getStructuringElement(MORPH_RECT, Size(5, 5)));
	
  //morphological opening
	erode(imgThresholded, imgThresholded, getStructuringElement(MORPH_RECT, Size(5, 5))); 
	dilate(imgThresholded, imgThresholded, getStructuringElement(MORPH_RECT, Size(5, 5))); 

	return imgThresholded;
}


int main(){
 


  // Create a VideoCapture object, 0 for the webCam

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
  
  map <char,list<int> > keyValueOperators;
  keyValueOperators.insert(make_pair<char,list<int> > ('+',{0,1,0,1,0,1,0,1}) );
  keyValueOperators.insert(make_pair<char,list<int> > ('-',{0,0,0,1,0,0,0,1}) );
  keyValueOperators.insert(make_pair<char,list<int> > ('*',{1,1,1,1,1,1,1,1}) );
  keyValueOperators.insert(make_pair<char,list<int> > ('/',{0,0,1,0,0,0,1,0}) );
  
  list<int> numb;
  list<char> op;
  
  for (auto const& element : keyValueNumbers) {
    numb.push_back(element.first);
  }

  for (auto const& element : keyValueOperators) {
    op.push_back(element.first);
  }

    
  // Check if camera opened successfully
  if(!cap.isOpened()){
    cout << "Error opening video stream or file" << endl;
    return -1;
  }
     
  while(1){
    list<char> calculation;
  
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
    threshold(frame,framet, thresh, maxValue, THRESH_BINARY_INV);



    framet = morphologicalOpeningClosing(framet); //Operaçoes Morfologicas de opening e closing para eliminar gaps

    
    Mat canny_output;
    vector<Vec4i> hierarchy;
    vector<vector<Point> > contours;
    
    /// Detect edges using canny
    Canny( framet, canny_output, thresh, thresh*2, 7 );


    /// Find contours
    findContours( canny_output, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE , Point(0, 0) );
    
    
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
        drawContours( drawing, contours, (int)i, Scalar(0, 255, 0 ), 1, LINE_8, hierarchy, 0 );
        rectangle( drawing, boundRect[i].tl(), boundRect[i].br(), Scalar(255, 0, 0 ), 1 );

    }

    int centerSegY;
    int centerSegX;
    
    list<int> SegmentsNormalized;
    Mat Segments = Mat(); 
    bool error = false;
    bool isNumber;
    bool isOp;
    int count_Rect = 0;
    bool later = false;
    for( Rect r : boundRect)
    {   

      isOp = false;
      isNumber=false;
      
      if (r.height > framet.rows * 0.1 && r.width > framet.cols * 0.1){
      
        centerSegY = r.height / 14;
        centerSegX = r.width / 8;

        //8
        Point SegDivided[14] = { 
          //0
          Point(r.x + centerSegX, r.y + centerSegY), 
          Point(r.x + r.width - centerSegX, r.y + centerSegY) , 
          //1
          Point(r.x + r.width - centerSegX, r.y + centerSegY),
          Point(r.x + r.width - centerSegX, r.y + r.height/2), 
          //2
          Point(r.x + r.width - centerSegX,r.y + r.height/2), 
          Point(r.x + r.width - centerSegX,r.y + r.height - centerSegY ),
          //3
          Point(r.x + centerSegX, r.y + r.height - centerSegY), 
          Point(r.x + r.width -  centerSegX, r.y + r.height - centerSegY), 
          //4
          Point(r.x + centerSegX,r.y + r.height/2), 
          Point(r.x + centerSegX,r.y + r.height - centerSegY),
          //5
          Point(r.x + centerSegX,r.y + centerSegY), 
          Point(r.x + centerSegX,r.y + r.height/2 ), 
          //6
          Point(r.x + centerSegX,r.y + r.height/2 ), 
          Point(r.x  + r.width- centerSegX,r.y + r.height/2) 
        };
        
        centerSegY = r.height / 10;
        centerSegX = r.width / 10;
        //*
        Point SegDividedOp[16] = { 
          //0
          Point(r.x + centerSegX, r.y + centerSegY), 
          Point(r.x + r.width/2, r.y + r.height/2) , 
          //1
          Point(r.x + r.width/2, r.y + centerSegY),
          Point(r.x + r.width/2, r.y + r.height/2), 
          //2 
          Point(r.x + r.width/2 ,r.y + r.height/2),
          Point(r.x + r.width - centerSegX, r.y + centerSegY),
          //3
          Point(r.x + r.width/2, r.y + r.height/2), 
          Point(r.x + r.width - centerSegX, r.y + r.height/2), 
          //4
          Point(r.x + r.width/2, r.y + r.height/2), 
          Point(r.x + r.width - centerSegX,r.y + r.height - centerSegY),
          //5
          Point(r.x + r.width/2, r.y + r.height/2), 
          Point(r.x + r.width/2, r.y + r.height - centerSegY ), 
          //6
          Point(r.x + centerSegX, r.y + r.height - centerSegY ), 
          Point(r.x  + r.width/2, r.y + r.height/2),
          //7
          Point(r.x + centerSegX, r.y + r.height/2 ), 
          Point(r.x + r.width/2, r.y + r.height/2)
        };

        
        int count=0;
        Point tmp;
        SegmentsNormalized.clear();
        for(Point p : SegDivided){


          
          int total;
          float value;
          
        
          if ( count != 0 && count%2 !=0){
            line(drawing, tmp, p, Scalar(255,0,0), 4);
            if (tmp.x < p.x){
              
              total = p.x - tmp.x;
              for (int i =tmp.x ;i< p.x;i++){
                //varies the columns and fixes the row
                Segments.push_back((int)framet.at<uchar>(p.y, i));

              }


           
              value = (float)countNonZero(Segments) / (float)total;
              if (value > 0.8){
                SegmentsNormalized.push_back(1);
              }else{
                SegmentsNormalized.push_back(0);
                
              }

            }else{
             
              for (int i =tmp.y ;i< p.y ;i++){
                
                //varies the row and fixes the column
                Segments.push_back((int)framet.at<uchar>(i,p.x));
              }


              total = p.y -tmp.y;
              
              value = (float)countNonZero(Segments) / (float)total;
              


              if (value > 0.8){
                SegmentsNormalized.push_back(1);
              }else{
                SegmentsNormalized.push_back(0);
                
              }


            }


            Segments = Mat();

          }else{
            tmp = p;
            
          }
          
          count++;
          
         
          
        }


        
    
       
        for( int key : numb){
          if(keyValueNumbers[key] == SegmentsNormalized){
            isNumber = true;
            if(count_Rect != 0 && count_Rect %2 != 0)
            {
              calculation.push_back((char)key);
              if(later){
                calculation.push_back('-');
                later = false;
              }
              
              
              break;
            }
            
          } 
            
          
        }
        

        //Check for Operators
        if(!isNumber){
          SegmentsNormalized.clear();
          count =0;
          for(Point p : SegDividedOp){
            
            int total;
            float value;
            

            Mat Segments;    

          
            if ( count!=0 && count%2 !=0){
              line(drawing, tmp,p,Scalar(255,0,0), 4);
              if (tmp.x < p.x){
                if(tmp.y < p.y){
                  int count_y = tmp.y;
                  for (int i =tmp.x ;i< p.x;i++){
                    Segments.push_back((int)framet.at<uchar>( count_y,i));
                    count_y++;

                  }
                }else if (tmp.y > p.y){
                  int count_y = tmp.y;
                  for (int i =tmp.x ;i< p.x;i++){
                    Segments.push_back((int)framet.at<uchar>( count_y,i));
                    count_y--;

                  }
                }else{
                  for (int i =tmp.x ;i< p.x;i++){
                    Segments.push_back((int)framet.at<uchar>(p.y,i ));
                  }
                }

                total = (r.width/2) - (2*centerSegX);
                

            
                value = (float)countNonZero(Segments) / (float)total;
                if (value > 0.70){
                  SegmentsNormalized.push_back(1);
                }else{
                  SegmentsNormalized.push_back(0);
                  
                }

              }else{
              
                for (int i =tmp.y ;i< p.y ;i++){

                  Segments.push_back((int)framet.at<uchar>(i, p.x));
                }


                total = (r.height / 2) - (2*centerSegY);
                
                value = (float)countNonZero(Segments) / (float)total;



                if (value > 0.70){
                  SegmentsNormalized.push_back(1);
                }else{
                  SegmentsNormalized.push_back(0);
                  
                }


              }

              
              
              Segments.release();


            

              
              
            }else{
              tmp = p;
              
            }
            
            count++;
            
          
            
          }

        }

       
        for( int key : op){
          if(keyValueOperators[key] == SegmentsNormalized){
            isOp = true;
            if( count_Rect % 2 != 0 && count_Rect != 0){
              calculation.push_back((char)key);
              break;
            }
            
          } 
            
          
        }

        





        SegmentsNormalized.clear();

        

        
      }
      
      if (r.height > framet.rows * 0.1 && r.height > r.width && !isNumber && !isOp){
        centerSegY = r.height / 2;
        centerSegX = r.width / 2;

        
        Point SegDivided[2] = { 
          //0
          Point(r.x + centerSegX, r.y), 
          Point(r.x + centerSegX, r.y + 2*centerSegY) , 
        };

        int total;
        float value;
        int count=0;
        Point tmp;
          
        for (Point p : SegDivided){
          if ( count != 0 && count%2 !=0){
            line(drawing, tmp, p, Scalar(255,0,0), 4);
            
            for (int i =tmp.y ;i< p.y ;i++){
              
              //varies the row and fixes the column
              Segments.push_back((int)framet.at<uchar>(i,p.x));
            }


            total = p.y -tmp.y;
            
            value = (float)countNonZero(Segments) / (float)total;



            SegmentsNormalized.clear();
            if (value > 0.70){

              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(1);
              SegmentsNormalized.push_back(1);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
            }else{
              SegmentsNormalized.push_back(0);
              
            }



            Segments = Mat();

          }else{
            tmp = p;
            
          }
          
          count++;
          
         
          
        }


        
    
        
        if(keyValueNumbers[1] == SegmentsNormalized){
          isNumber = true;
          if(count_Rect != 0 && count_Rect %2 != 0)
          {
            calculation.push_back((char)1);
            if(later){
              calculation.push_back('-');
              later = false;
            }
          }  
          
        } 
            
          
      }
      
      if (r.width > framet.cols * 0.1 && r.width> r.height && !isNumber && !isOp){

        centerSegY = r.height / 2;
        centerSegX = r.width / 10;

        
        Point SegDivided[2] = { 
          //0
          Point(r.x + centerSegX, r.y + centerSegY), 
          Point(r.x + r.width - centerSegX, r.y + centerSegY) , 
        };

        int total;
        float value;
        int count=0;
        Point tmp;
          
        for (Point p : SegDivided){
          if ( count != 0 && count%2 !=0){
            line(drawing, tmp, p, Scalar(255,0,0), 4);
            
            for (int i =tmp.x ;i< p.x ;i++){
              
              //varies the row and fixes the column
              Segments.push_back((int)framet.at<uchar>(p.y,i));
            }


            total = p.x -tmp.x;
            
            value = (float)countNonZero(Segments) / (float)total;



            SegmentsNormalized.clear();
            if (value > 0.70){

              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(1);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(0);
              SegmentsNormalized.push_back(1);
              
            }else{
              SegmentsNormalized.push_back(0);
              error = true;
              break;
              
            }



            Segments = Mat();

          }else{
            tmp = p;
            
          }
          
          count++;
          
         
          
        }
        
        if(keyValueOperators['-'] == SegmentsNormalized){
          isOp = true;
          if(count_Rect != 0 && count_Rect %2 != 0)
          {
            if(calculation.size() != 0){
              calculation.push_back('-');
            }else{
              later = true;
            }
          }  
          
        } 




      }
      
      count_Rect++;
      

     

    }

    
    imshow("black and white", framet);
    for(char c : calculation){
      if( (int)c >= 0 && (int)c <=9){
        cout << "num " << (int)c << endl;
     
      }else{
        cout << "op "<< c << endl;
      
      }
    }
    

    list<char>::iterator it;

    list<int>::iterator it2;

    
    bool O = false;
    bool N = false;
    char Lop = '0';
    string sum_tmp;
    int calc = -1;
    char tmp;

    list<char> calculation_final;
    list<char> calculation_tmp;

    for(char c : calculation){
      calculation_tmp.push_front(c);
    }

    calculation = calculation_tmp;
    


    if(!error){  
      if(calculation.size() > 0){

          tmp = calculation.front();
          

          it = find(op.begin(), op.end(), (char)tmp);
          //Check for operator
          if( it != op.end()){

            cout << "ERROR1" << endl;
        
            error = true;
          }

          if(!error){
            it2 = find(numb.begin(), numb.end(), (int)tmp);
            //Check for number
            if( it2 == numb.end()){
              error = true;
              cout << "ERROR4" << endl;
          
            }else{

              sum_tmp = to_string((int)calculation.front());

              cout << "sum" << sum_tmp << endl;
              calculation_final = calculation;
              calculation.pop_front();
            }
          }
        
      }else{
        error = true;

        cout << "ERROR3" << endl;
        
      }
    }
    


    if (!error){
      cout << "NO ERROR" << endl;
      if(calculation.size() > 0){
        for(char n : calculation){


          it = find(op.begin(), op.end(), n);
          //Check for operator
          if( it != op.end()){
            O = true;
            if (calc != -1){
              if(Lop == '/'){
                calc = calc / stoi(sum_tmp);
              }else if(Lop == '*'){
                calc = calc * stoi(sum_tmp);
              }else if(Lop == '+'){
                calc = calc + stoi(sum_tmp);
              }else{
                calc = calc - stoi(sum_tmp);
              }
            }else{

              try{
                if (sum_tmp.length() != 0){
                  calc = stoi(sum_tmp);
                }
              }catch(int e){
                error = true;
                break;
              }


            }

            Lop = n;
            sum_tmp.clear();

          }else{ 

            it2 = find(numb.begin(), numb.end(), (int)n);

            //Check for number
            if( it2 != numb.end()){
              N = true;
              sum_tmp += to_string((int)n) ;
            }

          }

          if(!N && !O){
            error = true;
            break;
          }

        N= false;
        O=false;

        }
        if( sum_tmp.length() > 0){
          if(Lop == '/'){
            calc = calc / stoi(sum_tmp);
          }else if(Lop == '*'){
            calc = calc * stoi(sum_tmp);
          }else if(Lop == '+'){
            calc = calc + stoi(sum_tmp);
          }else{
            calc = calc - stoi(sum_tmp);
          }
          }
      }
    }
    
    if(error){
      cout << "Não foi possível descodificar a sua conta" << endl;
    }else{
      if(calculation.size() > 0){  
        for(char n : calculation_final){
          if( (int)n >= 0 && (int)n <=9){
            cout << (int)n << endl;
     
          }else{
            cout << n << endl;
         
          }
        }
      }else{
        
        calc = stoi(sum_tmp);

      }

      cout << "Resultado: " << calc << endl;
      
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