import AWS from 'aws-sdk';

export function getConnection() {
	return new AWS.S3();
}

export function getBucket() {
	return process.env.REACT_APP_AWS_MEDIA_BUCKET ?? '';
}

export function upload(file: File, path: string) {
	const conn = getConnection();

	return new Promise((resolve, reject) => {
		const start = performance.now();
		console.log(start);
		conn.upload(
			{
				Bucket: getBucket(),
				Key: path,
				Body: file,
			},
			(err, data) => {
				if (err) return reject(err);

				const end = performance.now();
				console.log(end - start);
				resolve(data);
			},
		);
	});
}

export function uploadVideo(file: File) {
	return upload(file, 'videos');
}
