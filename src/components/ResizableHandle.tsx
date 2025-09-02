const ResizableHandle = ({ onMouseDown }) => (
    <div
        className="resize-handle"
        onMouseDown={onMouseDown}
    />
);

export default ResizableHandle;