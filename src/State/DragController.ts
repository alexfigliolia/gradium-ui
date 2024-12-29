import { State } from "@figliolia/galena";
import { createUseState } from "@figliolia/react-galena";

export class DragController<T> extends State<IDragController<T>> {
  public useState = createUseState(this);
  constructor(
    name = "Drag Controller",
    initialState: IDragController<T> = {
      id: undefined,
      data: undefined,
    },
  ) {
    super(name, initialState);
  }

  public registerDrag(id: DragID, data?: T) {
    this.update(state => {
      state.id = id;
      state.data = data;
    });
  }

  public useDragging() {
    return this.useState(DragController.useDragging);
  }

  public useDragID() {
    return this.useState(DragController.useDragID);
  }

  public useDragData() {
    return this.useState(DragController.useDragData<T>);
  }

  public static readonly useDragID = <D>(state: IDragController<D>) => state.id;
  public static readonly useDragging = <D>(state: IDragController<D>) =>
    state.id !== undefined;
  public static readonly useDragData = <D>(state: IDragController<D>) =>
    state.data;
}

interface IDragController<T> {
  id?: DragID;
  data?: T;
}

type DragID = number | string;
