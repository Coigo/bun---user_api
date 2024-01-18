export default interface UseCase<IN, OUT> {
    handle(entrada: IN): Promise<OUT>
}