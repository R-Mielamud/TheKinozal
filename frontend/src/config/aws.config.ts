import AWS from 'aws-sdk';

export default function configureAWSCredentials() {
	AWS.config.update({
		region: process.env.REACT_APP_AWS_MEDIA_REGION,
		credentials: {
			accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY ?? '',
			secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY ?? '',
		},
	});
}
