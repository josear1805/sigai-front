import { useSelector } from 'react-redux';
import { Select } from "antd";
import { makeRequest } from 'src/helpers';

const { Option } = Select;

const SelectCategoriasComponent = () => {
    const { listaCategorias } = useSelector((stateData) => stateData.global)
    
    function onChange(value) {
        console.log(`selected ${value}`);
        makeRequest({
            method: "POST",
            path: "/indican/modcategoriasindicadores.php",
            body: {
                token: 1234,
                id: value
            }
        }).then(response => {
            console.log("CASA", response);
            // if (response.estatus == 1) {
            //     dispatch({
            //         type: types.setListaCategorias,
            //         payload: response.categorias
            //     })
    
            // }
        })
    }
    
    function onBlur() {
        console.log('blur');
    }
    
    function onFocus() {
        console.log('focus');
    }
    
    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Selecione una categoría"
            optionFilterProp="children"
            onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                listaCategorias.length >= 1 && listaCategorias.map((item) => (
                    <Option 
                        value={item.idCategoria}
                        key={item.idCategoria}
                    >
                        {item.nbCategoria}
                    </Option>
                ) )
            }
        </Select>
    );
};

export default SelectCategoriasComponent;
