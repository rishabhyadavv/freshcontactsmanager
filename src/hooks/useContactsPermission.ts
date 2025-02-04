import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';

/**
 * Custom hook to handle contact permissions
 */
const useContactsPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    checkContactsPermission();
  }, []);

  /**
   * Checks if contact permissions are granted
   */
  const checkContactsPermission = async () => {
    try {
      const osPermissions =
        Platform.OS === 'android'
          ? [PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.WRITE_CONTACTS]
          : [PERMISSIONS.IOS.CONTACTS];

      // Check multiple permissions
      const statuses = await checkMultiple(osPermissions);
      const allGranted = osPermissions.every(permission => statuses[permission] === RESULTS.GRANTED);

      if (allGranted) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error('Error checking contacts permission:', error);
    }
  };

  /**
   * Requests contact permissions if not already granted
   */
  const requestContactsPermission = async () => {
    try {
      const osPermissions =
        Platform.OS === 'android'
          ? [PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.WRITE_CONTACTS]
          : [PERMISSIONS.IOS.CONTACTS];

      const statuses = await checkMultiple(osPermissions);
      const allGranted = osPermissions.every(permission => statuses[permission] === RESULTS.GRANTED);

      if (!allGranted) {
        const requestStatuses = await requestMultiple(osPermissions);
        const allRequestGranted = osPermissions.every(permission => requestStatuses[permission] === RESULTS.GRANTED);

        if (allRequestGranted) {
          setHasPermission(true);
        } else {
          Alert.alert('Permission Denied', 'Unable to access contacts without permission.');
          setHasPermission(false);
        }
      } else {
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
    }
  };

  return { hasPermission, checkContactsPermission, requestContactsPermission };
};

export default useContactsPermission;
