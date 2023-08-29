import FoodItem from "./FoodItem"

const Table = ({ data }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Food</th>
                    <th>Category</th>
                    <th>Food group</th>
                    <th>Portion size</th>
                </tr>
                {data.map((food) => (
                    <tr key={food.fdcId}>
                        <td><FoodItem fdcId={food.fdcId} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table