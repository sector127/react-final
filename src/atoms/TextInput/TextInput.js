export const TextInput = ({ value, onChange, placeholder = '' }) => {
  const id = Math.random().toString();
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        id={id}
        name="filterTerm"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
