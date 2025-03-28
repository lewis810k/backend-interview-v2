# 백엔드 채용 과제

## 주제

- Nest.JS를 사용해 간단한 쇼핑몰 서버를 구현해주세요!

## 구현

- JWT에 기반한 로그인 시스템이 있어야 합니다.
- 상품 정보에 관한 CRUD가 모두 있어야 합니다. (상품 리스트, 상품 상세, 상품 생성, 상품 수정, 상품 삭제)
- 상품 정보에 필요한 항목은 상품 이름, 상품 설명, 상품 브랜드, 상품 가격, 상품 사이즈, 상품 색상입니다.
- 최소 3개 이상의 필터링이 구현된 상품 목록이 있어야 합니다.
- 최소 3개 이상의 정렬이 구현된 상품 목록이 있어야 합니다.
- 리뷰, 좋아요 등 유저 관련 기능이 1개 이상 포함되어야 합니다.
- 프레임워크는 Nest.JS, 언어는 Typescript를 사용합니다.
- ORM 사용 가능합니다. (TypeORM, Sequelize)

## 제출 방법

이 리포지토리를 fork하여 개발한 후, PR을 보내주세요.

## 목적
- RESTful API에 대한 이해도 검증
- SQL에 대한 이해도 검증
- 인증시스템에 대한 이해도 검증

## 문의 사항

- 과제를 수행하며 궁금한 점이 생기시면 hoseung.choi@fetching.co.kr로 문의해주세요

## 실행방법
```angular2html
// 의존성 설치
npm install

// 로컬 DB 세팅
cd .docker
docker-compose up -d

// 서버 구동
npm run start
```