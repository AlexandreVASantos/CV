
import math

##center[-1.5, 0.3, 1.5]

##center[1.5, 0.3, 1.5]


##center[-1.5, 0.3, -1.5]

##center[1.5, 0.3, -1.5]
def main():

	circle1=[]
	circle2=[]
	cilinder = []
	r= 0.3
	center = []
	for i in range(360):
		radians= math.radians(i)
		circle1.append((-1.5,math.sin(radians)*r + 0.3 ,math.cos(radians)*r + 1.5 ))

	for i in range(360):
		radians= math.radians(i)
		circle2.append((0,math.sin(radians)*r + 0.3 ,math.cos(radians)*r + 1.5 ))



	for i in range(len(circle1)-1):
		cilinder.append((circle1[i], circle2[i+1], circle1[i+1]));

	print(cilinder)

	






main()