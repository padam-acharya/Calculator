import { ACTIONS } from "./Layout";

export default function Operator({ operator, dispatch }) {
  return (
    <button
      className="btn"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator } })
      }
    >
      {operator}
    </button>
  );
}
