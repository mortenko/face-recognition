import { types } from "mobx-state-tree";
import { SharedModel } from "./ui-state";
import { DomainModel } from "./domain-state";

const RootModel = types.model("RootStore", {
  sharedStore: types.optional(SharedModel, {}),
  domainStore: types.optional(DomainModel, {})
});

const RootStore = RootModel.create({});

export default RootStore;
