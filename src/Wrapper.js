import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const initialState = {
  items: [],
};
export const BasketContext = React.createContext(initialState);

const Wrapper = ({ children }) => {
  const [items, setItems] = useLocalStorage('basket.items', []);
  const intl = useIntl();

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem: newItem => {
          setItems(prevItems => [...prevItems, newItem]);
          toast.success(intl.formatMessage({ id: 'basket.alert.successfully.adeed' }), {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        },
        deleteCarByIndex: indexToRemove => {
          setItems(prevItems => prevItems.filter((item, index) => index !== indexToRemove));
          toast.success(intl.formatMessage({ id: 'basket.alert.successfully.deleted' }), {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        },
        clear: () => {
          setItems([]);
        },
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default Wrapper;
