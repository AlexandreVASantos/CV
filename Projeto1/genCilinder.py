
import math

##center[-1.5, 0.3, 1.5] V

##center[1.5, 0.3, 1.5]V


##center[-1.5, 0.3, -1.5] V

##center[1.5, 0.3, -1.5] V
def main():
	center = [(-1,0.3,1.5),(-1,0.3,-1.5),(1,0.3,-1.5),(1,0.3,1.5)]
	r= 0.3
	cilinder = []
	f= open("cilinder.txt", 'w')
	for i in range(4):
		circle1=[]
		circle2=[]
		
		cilinder = []
		c = center[i]
		
		for i in range(360):
			radians= math.radians(i)
			circle1.append((c[0],math.sin(radians)*r + c[1] ,math.cos(radians)*r + c[2] ))

		for i in range(360):
			radians= math.radians(i)
			if c[0] == -1:
				circle2.append((c[0] + 0.2,math.sin(radians)*r + c[1] ,math.cos(radians)*r + c[2] ))
			else:
				circle2.append((c[0] - 0.2,math.sin(radians)*r + c[1] ,math.cos(radians)*r + c[2] ))

		for i in range(len(circle1)):
			if i != len(circle1)-1:
				cilinder.append((circle1[i], circle1[i+1], c))
			else:
				cilinder.append((circle1[i], circle1[0], c))
		for i in range(len(circle2)):
			if i != len(circle2)-1:
				cilinder.append((circle2[i], (1,0.3,-1.5), circle2[i+1]))
			else:
				cilinder.append((circle2[i], (1,0.3,-1.5), circle2[0]))

		for i in range(len(circle1)):
			if i != len(circle1)-1:
				if i < len(circle1)/2:
					cilinder.append((circle1[i+1], circle1[i], circle2[i]));
					cilinder.append((circle1[i+1], circle2[i], circle2[i+1]));
				else:
					cilinder.append((circle1[i], circle2[i+1], circle1[i+1]));
					cilinder.append((circle1[i], circle2[i], circle2[i+1]));
			else:
				cilinder.append((circle1[i], circle2[0], circle1[0]));
				cilinder.append((circle1[i], circle2[i], circle2[0]));


			
		f= open("cilinder.txt", 'a')
		count=0
		for i in cilinder:
			
			f.write(str(i[0][0]) + ',' + str(i[0][1]) + ',' +str(i[0][2]) + ' ,\n')
			f.write(str(i[1][0]) + ',' + str(i[1][1]) + ',' + str(i[1][2]) + ' ,\n')
			f.write(str(i[2][0]) + ',' + str(i[2][1]) + ',' + str(i[2][2]) + ' ,\n')
			count +=3


	print(count)






main()