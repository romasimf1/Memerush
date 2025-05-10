import { NextPageContext } from 'next'

type ErrorProps = {
  statusCode?: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Ошибка {statusCode || 500}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200">
        Что-то пошло не так. Попробуйте обновить страницу или вернуться позже.
      </p>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 