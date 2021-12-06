import { useSelector, useDispatch } from 'react-redux';
import { Select, notification } from "antd";
import { makeRequest } from 'src/helpers';
import { setUser } from "src/redux/reducers/globalSlice";
import { useRouter } from 'next/router';

const { Option } = Select;

const SelectCategoriasComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { dataUser, listaCategorias } = useSelector((stateData) => stateData.global)
    
    function handleChangeCategory(value) {
        makeRequest({
            method: "POST",
            path: "/indican/modcategoriasindicadores.php",
            body: {
                idCategoria: value
            }
        }).then(response => {
            if (response.estatus == 1) {
                notification.success({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                if (process.browser) {
                    const token = JSON.parse(localStorage.getItem("token_sigai"))
                    dispatch(setUser(token));
                    props.handleSuccess();
                }
            } else {
                notification.error({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
            }
        })
    }

    return (
        <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Selecione una categoría"
            optionFilterProp="children"
            onChange={handleChangeCategory}
            value={dataUser.idCategoria? dataUser.idCategoria: 0}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                listaCategorias.length >= 1 && listaCategorias.map((item) => (
                    <Option 
                        value={parseInt(item.idCategoria)}
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
