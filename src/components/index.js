import dynamic from "next/dynamic";
import TableComponent from "./table";
import EditableTableComponent from "./editable-table";
import PageHeaderComponent from "./page-header";
import ButtonComponent from "./button";
import ModalComponet from "./modal";
import SelectCategoriasComponent from "./select-categorias";
import ChartCardComponent from "./chart-card";

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

const ChartColumnLine = dynamic(() => import("src/components/charts/column_line"), {
    ssr: false,
});

export {
    TableComponent,
    EditableTableComponent,
    ChartColumn,
    PageHeaderComponent,
    ButtonComponent,
    ModalComponet,
    SelectCategoriasComponent,
    ChartCardComponent,
    ChartColumnLine
};
