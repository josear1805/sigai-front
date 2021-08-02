import { Pie } from '@ant-design/charts'

const ChartPie = () => {
    const data = [
        {
          type: 'Perros',
          value: 27,
        },
        {
          type: 'Ratón',
          value: 25,
        },
        {
          type: 'Gatos',
          value: 18,
        },
        {
          type: 'Tortugas',
          value: 15,
        },
        {
          type: 'Aves',
          value: 10,
        },
        {
          type: 'Cocodrilos',
          value: 5,
        },
      ];
      const config = {
        appendPadding: 10,
        data: data,
        width: '100%',
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: function content(_ref) {
            const percent = _ref.percent;
            return ''.concat((percent * 100).toFixed(0), '%');
          },
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [{ type: 'element-active' }],
      };
    return (
        <Pie {...config} />
    )
}

export default ChartPie