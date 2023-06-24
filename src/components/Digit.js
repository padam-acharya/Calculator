import { ACTIONS } from "./Layout";
export default function Digit({ number, dispatch }) {
  return (
    <button
      className="btn"
      onClick={() =>
        dispatch({
          type: ACTIONS.ADD_DIGIT,
          payload: { number }
        })

      }
    >
      {number}
    </button>
  );
}
