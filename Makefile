# テストを実行するターゲット
test:
	npm test
deploy:
	npm run build
	firebase deploy