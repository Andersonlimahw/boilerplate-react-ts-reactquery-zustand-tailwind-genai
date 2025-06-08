interface ErrorApiComponentProps {
    onRetry: Function
}
export const ErrorApiComponent = ({ onRetry } : ErrorApiComponentProps) => {
    return (
        <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Sorry!</div>
                    <p className="text-gray-700 text-base">
                        A error happens D:
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="button inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer" onClick={() => onRetry()}> try again </span>                  
                </div>
        </div>
    )
}