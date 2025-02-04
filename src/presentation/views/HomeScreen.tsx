import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { ContactModel } from '@data/models/ContactModel';
import { RootStackParamList } from '@presentation/navigators/RootNavigator';
import { useContactViewModel } from '@presentation/viewmodels/ContactViewModel';
import ContactItem from '@presentation/components/ContactItem'; 
import useContactsPermission from '@hooks/useContactsPermission';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { hasPermission, requestContactsPermission } = useContactsPermission();
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
  }, [navigation,hasPermission]);


  const handleAddContactPress = async () => {
    if (hasPermission) {
      navigation.navigate('AddContact');
    } else {
      Alert.alert("Permission", "Unable to add contacts without permission.");
    }
  };

  const handleEditContactPress = useCallback((contact: ContactModel) => {
    if (hasPermission) {
      navigation.navigate('EditContact', { contact });
    } else {
      Alert.alert('Permission', 'Unable to edit contacts without permission.');
    }
  }, [hasPermission, navigation]);
  
  const renderContact = useCallback(({ item }) => {
    return <ContactItem contact={item} onEdit={handleEditContactPress} />;
  }, [handleEditContactPress]);

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
            renderItem={renderContact}
            estimatedItemSize={50}
            onEndReached={() => contactViewModel.loadMoreContacts()}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )
      ) : (
        <View style={styles.permissionContainer}>
          <TouchableOpacity onPress={requestContactsPermission} style={styles.permissionButton}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/contacts.png' }} style={styles.icon} />
            <Text style={styles.permissionText}>We need your permission to fetch/add the contacts</Text>
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
