export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Newsletter CTA */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            채용 시장 인사이트를 매주 받아보세요
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            데이터 기반 커리어 인사이트를 뉴스레터로 전달합니다.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
              구독하기
            </button>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © 2026 커리어렌즈. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            데이터 기반 커리어 인사이트 블로그
          </p>
        </div>
      </div>
    </footer>
  );
}
