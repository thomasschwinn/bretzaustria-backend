import { create } from "zustand";

export const useUserStore = create((set) => ({
	// abcde
	produktartArr: [],
	setproduktartArr: (produktartArr) => set({ produktartArr }),
	ausstellungsstueckArr: [],
	setAusstellungsstueckArr: (ausstellungsstueckArr) =>
		set({ ausstellungsstueckArr }),

	bezugsstoffAuswahlArr: [],
	setBezugsstoffAuswahlArr: (bezugsstoffAuswahlArr) =>
		set({ bezugsstoffAuswahlArr }),

	columnListProducts: null,
	setColumnListProducts: (columnListProducts) => set({ columnListProducts }),

	dataObj: {},
	setDataObj: (dataObj) => set({ dataObj }),

	error: null,
	setError: (error) => set({ error }),

	// fghijk
	isLoadingFirst: null,
	setIsLoadingFirst: (isLoadingFirst) => set({ isLoadingFirst }),

	isMainLoading: false,
	setIsMainLoading: (isMainLoading) => set({ isMainLoading }),

	isOpenModal: false,
	setIsOpenModal: (isOpenModal) => set({ isOpenModal }),

	// lmnopq

	loadingDetail: null,
	setIsLoadingDetail: (loadingDetail) => set({ loadingDetail }),

	mainListBoxList: [],
	setMainListBoxList: (mainListBoxList) => set({ mainListBoxList }),

	preisanhangArr: [],
	setPreisanhangArr: (preisanhangArr) => set({ preisanhangArr }),

	prodCatList: [],
	setProdCatList: (prodCatList) => set({ prodCatList }),

	productlist: [],
	setProductlist: (productlist) => set({ productlist }),

	// rstu
	saleVerfuegbarkeitArr: [],
	setSaleVerfuegbarkeitArr: (saleVerfuegbarkeitArr) =>
		set({ saleVerfuegbarkeitArr }),

	selected: {
		term_slug: "sale",
		term_name: "Sale",
		currentmodel: true,
	},
	setSelected: (selected) => set({ selected }),
	// selectedHandsonTableLayout: { name: "Hauptfelder", fields: fieldsMain },
	// setSelectedHandsonTableLayout: (selectedHandsonTableLayout) =>
	// 	set({ selectedHandsonTableLayout }),

	showSuccesMessage: null,
	setShowSuccessMessage: (showSuccesMessage) => set({ showSuccesMessage }),

	slug: null,
	setSlug: (slug) => set({ slug }),

	slugs: [],
	setSlugs: (slugs) => set({ slugs }),

	stockstatusArr: [],
	setStockstatusArr: (stockstatusArr) => set({ stockstatusArr }),

	user: null,
	setUser: (user) => set({ user }),

	// wxyz
}));
