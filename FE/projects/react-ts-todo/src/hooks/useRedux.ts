import {
	TypedUseSelectorHook,
	useDispatch as useOriginalDispatch,
	useSelector as useOriginalSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '../store';

/*
  Typed Hook 구현
  
  useSelector에 입력되는 콜백함수의 selector(state)의 타입과 dispatch의 타입이 TS에서 추론이 잘 되지 않아 따로 명시를 해야함
  하지만 코드상에서 매번 타입을 선언하는 보일러플레이트는 비효율적이다.
  따라서 이를 타입 명시를 추가한 훅으로 다시 구현하여 TS에서 타입추론이 원활히 이루어지도록 한다. 이러한 훅을 Typed hook이라고 한다.
*/

export const useSelector: TypedUseSelectorHook<RootState> = useOriginalSelector;
export const useDispatch: () => AppDispatch = useOriginalDispatch;
