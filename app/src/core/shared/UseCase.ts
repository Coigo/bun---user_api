export default interface UseCase<IN, OUT> {
    handle(input: IN): Promise<OUT>
}