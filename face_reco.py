import face_recognition
import sys
import os
import glob
import cv2
import json


def main():
    # get the locations of known and unknown faces
    target_person_image = sys.stdin.readline().splitlines()
    target_name = sys.stdin.readline().splitlines()
    target_name = "".join(target_name)
    target_photos_dir = sys.stdin.readline().splitlines()

    # get the list of all target photos
    target_photos = glob.glob(target_photos_dir[0] + '/*.png')
    target_photos += glob.glob(target_photos_dir[0] + '/*.jpg')
    target_photos += glob.glob(target_photos_dir[0] + '/*.jpeg')

    # load the target person and learn how to recognize it
    target_person = face_recognition.load_image_file(target_person_image[0])
    target_person_encoding = face_recognition.face_encodings(target_person)[0]

    # prepare variables for face recognition process
    output = {
        "marked_photos": [],
        "photos": []
    }

    for photo_loc in target_photos:
        photo = face_recognition.load_image_file(photo_loc)
        face_locations = face_recognition.face_locations(photo)

        if not (len(face_locations) == 0):
            face_encodings = face_recognition.face_encodings(photo, face_locations)
            results = face_recognition.compare_faces(target_person_encoding, face_encodings, tolerance=0.5)

            for index, result in enumerate(results):
                if result:
                    (top, right, bottom, left) = face_locations[index]
                    # draw a box around the face
                    cv2.rectangle(photo, (left, top), (right, bottom), (0, 0, 255), 2)

                    # draw a label with a name below the face
                    cv2.rectangle(photo, (left, bottom - 25), (right, bottom), (0, 0, 255), -1)
                    font = cv2.FONT_HERSHEY_DUPLEX
                    cv2.putText(photo, target_name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

                    # save the image
                    base = os.path.basename(photo_loc)

                    if not os.path.exists(target_photos_dir[0] + '/results/'):
                        os.makedirs(target_photos_dir[0] + '/results/')
                    base = target_photos_dir[0] + '/results/' + base

                    output["marked_photos"].append(base)
                    output["photos"].append(photo_loc)
                    cv2.imwrite(base, cv2.cvtColor(photo, cv2.COLOR_RGB2BGR), [int(cv2.IMWRITE_JPEG_QUALITY), 100])

    print(json.dumps(output))


if __name__ == '__main__':
    main()