import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppContext } from '../context/AppContext';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const { addTransaction } = useAppContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      category: 'Еда',
      date: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Введите название'),
      amount: Yup.number()
        .typeError('Сумма должна быть числом')
        .min(1, 'Сумма должна быть больше 0')
        .required('Введите сумму'),
      date: Yup.date().required('Укажите дату'),
    }),
    onSubmit: (values) => {
      addTransaction(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="name">Название</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Например: Продукты"
          onChange={formik.handleChange}
          value={formik.values.name}
          className={formik.errors.name ? 'input-error' : ''}
        />
        {formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Сумма (руб)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Например: 1500"
          onChange={formik.handleChange}
          value={formik.values.amount}
          className={formik.errors.amount ? 'input-error' : ''}
        />
        {formik.errors.amount && (
          <div className="error-message">{formik.errors.amount}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="Еда">Еда</option>
          <option value="Транспорт">Транспорт</option>
          <option value="Жилье">Жилье</option>
          <option value="Развлечения">Развлечения</option>
          <option value="Медицина">Медицина</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Дата</label>
        <DatePicker
          id="date"
          selected={formik.values.date}
          onChange={(date) => formik.setFieldValue('date', date)}
          dateFormat="dd/MM/yyyy"
          className={formik.errors.date ? 'input-error' : ''}
        />
        {formik.errors.date && (
          <div className="error-message">{formik.errors.date}</div>
        )}
      </div>

      <button type="submit" className="submit-btn">
        Добавить расходы
      </button>
    </form>
  );
};

export default ExpenseForm;