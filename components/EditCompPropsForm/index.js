import { useRef } from 'react';

export default function EditCompPropsForm(props) {
  const inputRef = useRef(null);
  const { title } = props;
  const onSubmit = () => {
    if (props.onSubmit && inputRef?.current && inputRef?.current.value !== '') {
      props.onSubmit(inputRef?.current.value);
    }
    if (props.close) {
      props.close();
    }
  };

  const close = props.close;

  return (
    <form name="edit-comp-props" className="p-4">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          id="title"
          placeholder="Title"
          defaultValue={title}
        />
      </div>
      <button
        className="btn btn-primary mr-3"
        type="button"
        role="button"
        onClick={onSubmit}
      >
        Save
      </button>
      <button
        className="btn btn-secondary"
        type="button"
        role="button"
        onClick={() => close()}
      >
        Close
      </button>
    </form>
  );
}
