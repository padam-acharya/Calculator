import React, { useReducer } from "react";
import Digit from "./Digit";
import Operator from "./Operator";

const initialState = {
  currentOperand: "0",
  prevOperand: "",
  operator: ""
};

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete",
  EVALUATE: "evaluate"
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          prevOperand: "",
          currentOperand: payload.number,
          overwrite: false
        };
      }
      if (state.currentOperand.includes(".") && payload.number === ".") {
        return state;
      }
      if (state.currentOperand === "0" && payload.number === ".") {
        return {
          ...state,
          currentOperand: state.currentOperand + payload.number
        };
      }
      if (payload.number && state.currentOperand === "0") {
        return {
          ...state,
          currentOperand: payload.number
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand + "" + payload.number
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.operator) {
        return {
          ...state,
          prevOperand: evaluate(state),
          currentOperand: "",
          operator: payload.operator
        };
      }

      return {
        ...state,
        prevOperand: state.currentOperand,
        currentOperand: "",
        operator: payload.operator
      };

    case ACTIONS.EVALUATE:


      if (
        state.prevOperand === "" ||
        state.currentOperand === "" ||
        state.operator === ""
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state) + "",
        operator: "",
        prevOperand: "",
        overwrite: true
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: "0"
        };
      }
      if (state.currentOperand === "") {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: "0"
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };
    case ACTIONS.CLEAR:
      return initialState;

    default:
      return state;
  }
}

function evaluate({ currentOperand, prevOperand, operator }) {
  switch (operator) {
    case "+":
      return +currentOperand + +prevOperand;
    case "-":
      return prevOperand - currentOperand;
    case "x":
      return prevOperand * currentOperand;
    case "/":
      let result = prevOperand / currentOperand
      if (!isNaN(result)) {
        return prevOperand / currentOperand;
      }
      return "UNDEFINED"
    case "^":
      return Math.pow(prevOperand, currentOperand);
    default:
      return;
  }
}

export default function Layout() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="wrapper">
      <div className="container">
        <div className="prev-operand">
          {state.prevOperand}
          {state.operator}
        </div>

        <div className="current-operand">{state.currentOperand}</div>

        <button
          onClick={() => {
            dispatch({ type: ACTIONS.CLEAR });
          }}
          className="btn"
        >
          AC
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          className="btn"
        >
          DEL
        </button>
        <Operator operator="^" dispatch={dispatch} />
        <Operator operator="/" dispatch={dispatch} />
        <Digit number="1" dispatch={dispatch} />
        <Digit number="2" dispatch={dispatch} />
        <Digit number="3" dispatch={dispatch} />
        <Operator operator="x" dispatch={dispatch} />
        <Digit number="4" dispatch={dispatch} />
        <Digit number="5" dispatch={dispatch} />
        <Digit number="6" dispatch={dispatch} />
        <Operator operator="-" dispatch={dispatch} />
        <Digit number="7" dispatch={dispatch} />
        <Digit number="8" dispatch={dispatch} />
        <Digit number="9" dispatch={dispatch} />
        <Operator operator="+" dispatch={dispatch} />
        <Digit number="0" dispatch={dispatch} />
        <Digit number="." dispatch={dispatch} />
        <button
          className="span-two btn"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}
