import { Button } from '../../atoms';
import PropTypes from 'prop-types';

export const ProductTableRow = ({ name, price, qty, id, onCartAdd, onCartRemove }) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        რ-ბა: {qty} ც, სულ: {price * qty} $
      </td>
      <td>
        <div className="btn btn-group">
          <Button className="btn btn-outline-success" text="➕" onClick={onCartAdd} />
          <Button className="btn btn-outline-danger" text="⛔" onClick={onCartRemove} />
        </div>
      </td>
    </tr>
  );
};

ProductTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onCartAdd: PropTypes.func.isRequired,
  onCartRemove: PropTypes.func.isRequired,
};
