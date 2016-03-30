import {Record} from 'immutable';

const UiStateRecord = Record({
  currentFilter: undefined,
  actionOngoing: undefined,
  message: undefined
});

export class UiState extends UiStateRecord {

  currentFilter: string;
  actionOngoing: boolean;
  message: string;

  constructor(props) {
    super(props);
  }

}

export const initialUiState = new UiState({
  currentFilter: 'SHOW_ALL',
  actionOngoing: false,
  message: 'Ready'
});
