import { Formik, Form, Field } from 'formik';
import { ws } from '../../../api';

const initialValues = {
  body: '',
};

function InputMessage () {
  const addMessage = (values, formikBag) => {
    ws.createMessage(values);
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addMessage}>
      {formikProps => (
        <Form>
          <Field name='body'></Field>
          <button type='submit'>Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default InputMessage;
