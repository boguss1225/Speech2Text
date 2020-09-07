import speech_recognition as sr
import glob
import csv

DIRECTORY_PATH = 'C:/Users/younh/Desktop/STUDY/Projects/Cookie Jar Test/data/'
TARGET_PATH = DIRECTORY_PATH

# get list of images in a directory 
files = [f for f in glob.glob(DIRECTORY_PATH+"/*.wav", recursive=True)]

total = len(files)
cnt = 1;
if total == 0 : print("probably wrong Path : ", DIRECTORY_PATH)

print("<<start>>")
r = sr.Recognizer()

#write result into csv file
savefilename = DIRECTORY_PATH+"speech_result.csv"
new_csvfile = open(savefilename, 'w')
new_csvfile_writer = csv.writer(new_csvfile)

for f in files:
	with sr.AudioFile(f) as source:
		filename = f.split('\\')[1].split('.')[0]
		print("[",cnt,"/",total,"] ",filename)

		#speech to text
		audio_data = r.record(source)
		result = r.recognize_google(audio_data)

		#write result into csv file
		new_csvfile.write(filename+str(cnt)+","+result+"\n")

		#write result into text file
		#savefilename = DIRECTORY_PATH+filename+str(cnt)+".txt"
		#new_textfile = open(savefilename, mode='w')
		#new_textfile.write(result) 
		#new_textfile.close()
		
		#print(result) 
		
		cnt += 1

new_csvfile.close()
print("<<finish>>")

