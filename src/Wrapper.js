import { useIntl } from 'react-intl';
import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const initialState = {
  modalShow: false,
  selectedPlayer: {},
  teamId: '',
};
export const WrapperContext = React.createContext(initialState);

const Wrapper = ({ children }) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useLocalStorage('modal.show', false);
  const [selectedPlayer, setSelectedPlayer] = useLocalStorage('modal.player', null);
  const [teamId, setTeamId] = useLocalStorage('team.id', null);

  return (
    <WrapperContext.Provider
      value={{
        modalShow,
        selectedPlayer,
        teamId,
        setTeamId,
        openPlayerInfo: newPlayer => {
          setSelectedPlayer(() => newPlayer);
          setModalShow(true);
        },
        closeModal: () => {
          setModalShow(false);
        },
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};

export default Wrapper;
