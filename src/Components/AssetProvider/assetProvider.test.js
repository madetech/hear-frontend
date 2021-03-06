import React from "react";
import { mount, shallow } from "enzyme";
import AssetProvider from ".";

class ChildrenFake {
  constructor(searchValue) {
    this.onSearchReceived = undefined;
    this.assetsReceived = undefined;
    this.searchValue = searchValue;
  }

  executeOnSearch = () => this.onSearchReceived({ value: this.searchValue });

  render = ({ onSearch, assets }) => {
    this.onSearchReceived = onSearch;
    this.assetsReceived = assets;
  };
}

describe("<AssetProvider>", () => {
  describe("Example One", () => {
    it("Can call the searchAssets prop from the children", () => {
      let searchAssetsSpy = { execute: jest.fn() };
      let childrenFake = new ChildrenFake("Cats");

      shallow(
        <AssetProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalled();
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      let searchAssetsSpy = { execute: jest.fn() };
      let childrenFake = new ChildrenFake("Cats");

      shallow(
        <AssetProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith({ value: "Cats" });
    });

    it("Passes an empty assets array by default", () => {
      let searchAssetsDummy = {};
      let childrenFake = new ChildrenFake();

      shallow(
        <AssetProvider searchAssets={searchAssetsDummy}>
          {childrenFake.render}
        </AssetProvider>
      );

      expect(childrenFake.assetsReceived).toEqual([]);
    });

    it("Passes the found assets from the searchAssets prop to the children", () => {
      let searchAssetsStub = { execute: () => [{ cat: "meow" }] };
      let childrenFake = new ChildrenFake();

      mount(
        <AssetProvider searchAssets={searchAssetsStub}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(childrenFake.assetsReceived).toEqual([{ cat: "meow" }]);
    });
  });

  describe("Example Two", () => {
    it("Can call the searchAssets prop from the children", () => {
      let searchAssetsSpy = { execute: jest.fn() };
      let childrenFake = new ChildrenFake("Dogs");

      shallow(
        <AssetProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalled();
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      let searchAssetsSpy = { execute: jest.fn() };
      let childrenFake = new ChildrenFake("Dogs");

      shallow(
        <AssetProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith({ value: "Dogs" });
    });

    it("Passes the found assets from the searchAssets prop to the children", () => {
      let searchAssetsStub = { execute: () => [{ dog: "woof" }] };
      let childrenFake = new ChildrenFake();

      mount(
        <AssetProvider searchAssets={searchAssetsStub}>
          {childrenFake.render}
        </AssetProvider>
      );

      childrenFake.executeOnSearch();

      expect(childrenFake.assetsReceived).toEqual([{ dog: "woof" }]);
    });
  });
});
