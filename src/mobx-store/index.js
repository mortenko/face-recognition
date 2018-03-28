import { types } from "mobx-state-tree";
import { SharedModel } from "./ui-state";
import makeInspectable from 'mobx-devtools-mst';

const RootModel = types.model("RootStore", {
  sharedStore: types.optional(SharedModel, {
    isActiveScreen: "first",
    userName: "",
    isSuccessfullUploaded: false,
    inputValue: "",
    rootUniqueDirName: "",
    state: "pending"
  })
});

const RootStore = RootModel.create({});

export default makeInspectable(RootStore);
