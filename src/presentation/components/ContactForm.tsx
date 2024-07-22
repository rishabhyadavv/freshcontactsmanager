import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Keyboard,TouchableWithoutFeedback } from 'react-native';
import { ContactModel } from '@data/models/ContactModel';
import { validateGermanPhoneNumber } from '@utils/validators';
import { useImagePicker } from '@hooks/useImagePicker';

interface ContactFormProps {
  contact?: ContactModel;
  onSubmit: (contact: ContactModel) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact = { id: '', name: '', email: '', phone: '', photo: '' }, onSubmit }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const { photo, setPhoto, handlePhoto } = useImagePicker();
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    if (contact.photo) {
     setPhoto(contact.photo);
    }
  }, [contact]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validateGermanPhoneNumber(phone)) {
      newErrors.phone = 'Phone number is not valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newContact: ContactModel = {
        id: contact.id || Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        photo: photo || '',
      };
      onSubmit(newContact);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onBlur={() => validate()}
        onChangeText={setName}
        style={[styles.input, errors.name ? styles.errorInput : null]}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={() => validate()}
        keyboardType="email-address"
        style={[styles.input, errors.email ? styles.errorInput : null]}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        onBlur={() => validate()}
        style={[styles.input, errors.phone ? styles.errorInput : null]}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      {photo ? <Image source={{ uri: photo }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.photoButton} onPress={handlePhoto}>
        <Text style={styles.photoButtonText}>{contact.photo ? "Update photo" : "Add photo"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  photoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 12,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactForm;
