import React, { useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import ContactListItem from '@presentation/components/ContactListItem';
import { ContactModel } from '@data/models/ContactModel';
import { RootStackParamList } from '@presentation/navigators/RootNavigator';
import { useContactViewModel } from '@presentation/viewmodels/ContactViewModel';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [viewModelInitialized, setViewModelInitialized] = useState<boolean>(false);
  const contactViewModel = useContactViewModel();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={handleAddContactPress}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      ),
    });
    checkReadContactsPermission();
  }, [navigation]);

  const checkReadContactsPermission = async () => {
    try {
      let osPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS;
      const permission = await check(osPermission);
      if (permission === RESULTS.GRANTED) {
        setHasPermission(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestReadContactsPermission = async () => {
    try {
      let osPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS;
      const permission = await check(osPermission);
      if (permission !== RESULTS.GRANTED) {
        const result = await request(osPermission);
        if (result === RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          Alert.alert("Permission Denied", "Unable to access contacts without permission.");
        }
      } else {
        setHasPermission(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestWriteContactsPermission = async () => {
    try {
      let osPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_CONTACTS : PERMISSIONS.IOS.CONTACTS;
      const permission = await check(osPermission);
      if (permission !== RESULTS.GRANTED) {
        const result = await request(osPermission);
        return result === RESULTS.GRANTED;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleAddContactPress = async () => {
    const granted = await requestWriteContactsPermission();
    if (granted) {
      navigation.navigate('AddContact');
    } else {
      Alert.alert("Permission Denied", "Unable to add contacts without permission.");
    }
  };

  const handleEditContactPress = async (contact: ContactModel) => {
    const granted = await requestWriteContactsPermission();
    if (granted) {
      navigation.navigate('EditContact', { contact });
    } else {
      Alert.alert("Permission Denied", "Unable to edit contacts without permission.");
    }
  };

  useEffect(() => {
    if (hasPermission && !viewModelInitialized) {
      contactViewModel.fetchContacts();
      setViewModelInitialized(true);
    }
  }, [hasPermission, viewModelInitialized]);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        contactViewModel.loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlashList
            data={contactViewModel.contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <ContactListItem contact={item} onEdit={handleEditContactPress} />
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/chevron-right.png' }} style={styles.arrowIcon} />
              </View>
            )}
            estimatedItemSize={50}
            onEndReached={() => contactViewModel.loadMoreContacts()}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )
      ) : (
        <View style={styles.permissionContainer}>
          <TouchableOpacity onPress={requestReadContactsPermission} style={styles.permissionButton}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/contacts.png' }} style={styles.icon} />
            <Text style={styles.permissionText}>We need your permission to fetch the contacts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionButton: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  addButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default HomeScreen;
