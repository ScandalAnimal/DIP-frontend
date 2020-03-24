import { POSITIONS } from '../constants';

const playerService = {
  getPlayerName(player) {
    switch (player.id) {
      case 106:
        return 'Luiz';
      case 469:
        return 'Ceballos';
      case 504:
        return 'Martinelli';
      case 36:
        return 'Jota';
      case 486:
      case 428:
        return player.first_name;
      default:
        return player.second_name;
    }
  },
  getPlayerDetailName(player) {
    switch (player.id) {
      case 106:
        return 'David Luiz';
      default:
        return player.first_name + ' ' + player.second_name;
    }
  },
  getPositionLabel(player) {
    switch (player.element_type) {
      case POSITIONS.GK:
        return 'Goalkeeper';
      case POSITIONS.DF:
        return 'Defender';
      case POSITIONS.MF:
        return 'Midfielder';
      case POSITIONS.FW:
        return 'Forward';
      default:
        return null;
    }
  },
};

export default playerService;
