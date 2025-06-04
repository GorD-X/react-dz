import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useAppContext } from '../context/AppContext';

const ExpenseTable = () => {
  const { transactions, deleteTransaction } = useAppContext();

  const columns = React.useMemo(
    () => [
      { Header: 'Название', accessor: 'name' },
      { Header: 'Сумма (руб)', accessor: 'amount',
        Cell: ({ value }) => Number(value).toLocaleString('ru-RU')
      },
      { Header: 'Категория', accessor: 'category' },
      {Header: 'Дата', accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleDateString('ru-RU'),
      },
      {
        Header: 'Действия',
        Cell: ({ row }) => (
          <button
            onClick={() => {
              if (window.confirm('Удалить эту запись?')) {
                deleteTransaction(row.original.id);
              }
            }}
            style={{
              background: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Удалить
          </button>
        ),
      },
    ],
    [deleteTransaction]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: transactions }, useSortBy);

  return (
    <div style={{ margin: '20px 0', overflowX: 'auto' }}>
      <h2>История расходов</h2>
      <table 
        {...getTableProps()} 
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    borderBottom: '2px solid #ddd',
                    background: '#f5f5f5'
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                           ? ' ↓' // Иконка сортировки по убыванию
                      : ' ↑' // Иконка сортировки по возрастанию
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td 
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ddd'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;