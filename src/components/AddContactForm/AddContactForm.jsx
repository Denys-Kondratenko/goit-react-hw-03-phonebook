import PropTypes from 'prop-types';

import { Formik, ErrorMessage } from 'formik';
import {
  AddButton,
  ContactForm,
  ContactLabel,
  Input,
} from './AddContactForm.styled';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .min(2, 'Too Short!')
    .max(60, 'Too Long!')
    .required('Required'),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

const initialValues = { name: '', number: '' };

export const AddContactForm = ({ onSave }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSave({ id: nanoid(), name: values.name, number: values.number });
        resetForm();
      }}
    >
      <ContactForm autoComplete="off">
        <ContactLabel htmlFor="name">
          Name
          <Input name="name" required />
          <ErrorMessage name="name" component="p" />
        </ContactLabel>
        <ContactLabel htmlFor="number">
          Number
          <Input type="tel" name="number" required />
          <ErrorMessage name="number" component="p" />
        </ContactLabel>
        <AddButton type="submit">Add contact</AddButton>
      </ContactForm>
    </Formik>
  );
};

AddContactForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};
