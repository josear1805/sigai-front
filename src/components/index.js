import dynamic from "next/dynamic";
import TableComponent from "./table";
import PageHeaderComponent from "./page-header";
import ButtonComponent from "./button";
import ModalComponet from "./modal";
import SelectCategoriasComponent from "./select-categorias";

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

export {
    TableComponent,
    ChartColumn,
    PageHeaderComponent,
    ButtonComponent,
    ModalComponet,
    SelectCategoriasComponent,
};
