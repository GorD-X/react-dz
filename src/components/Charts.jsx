
import React, { useContext } from 'react'; 
import { Bar } from 'react-chartjs-2'; // Компонент для отображения столбчатой диаграммы

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip} from 'chart.js';
import { useAppContext } from '../context/AppContext'; 


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Charts = () => {
  const { transactions } = useAppContext();

  const getMonthlyData = () => {
    const monthlyData = {}; // Объект для хранения данных по месяцам
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date); // Преобразуем строку даты в объект Date
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Формат Год-Месяц
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += Number(transaction.amount);
    });

    return monthlyData;
  };

  const monthlyData = getMonthlyData();
  const months = Object.keys(monthlyData).sort();
  const amounts = months.map(month => monthlyData[month]);


  const formatMonthLabel = (monthStr) => {
    const [year, month] = monthStr.split('-'); 
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const data = {
    labels: months.map(formatMonthLabel),
    datasets: [ 
      {
        label: 'Расходы по месяцам', 
        data: amounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
        borderColor: 'rgba(54, 162, 235, 1)', 
        borderWidth: 1, 
      },
    ],
  };

 
  const options = {
    responsive: true, 
    plugins: { 
      title: { 
        display: true, 
        text: 'Все расходы по месяцам', 
      },
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        title: { 
          display: true, 
          text: 'Сумма (руб)'
        }
      },
      x: { 
        title: { 
          display: true, 
          text: 'Месяц'
        }
      }
    }
  };


  return (
    <div style={{ marginTop: '40px', maxWidth: '100%', overflowX: 'auto' }}>
      <div style={{ minWidth: '800px', height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;