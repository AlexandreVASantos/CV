cmake_minimum_required(VERSION 2.8.12)

project(p)

find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

add_executable(p p.cpp)
target_link_libraries(p ${OpenCV_LIBS})

