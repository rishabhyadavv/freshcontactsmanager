import { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { Platform } from 'react-native';

export const useImagePicker = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        let path = response.assets[0].uri || "";
        path = Platform.OS === "ios" ? path.replace("file://", "") : path;
        setPhoto(path);
      }
    });
  };

  return { photo, setPhoto, handlePhoto };
};
