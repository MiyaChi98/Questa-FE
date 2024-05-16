import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './constants/Enum/role.enum';

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl;
  const hasSessionToken = request.cookies.has('next-auth.session-token');
  const defaultPath = ['/']
  const authorizationPath = ['/authorization']
  const studentPaths = ['/student'];
  const teacherPaths = ['/teacher'];
  const matchesDefaultPath = defaultPath.some((path) =>
    redirectUrl.pathname.startsWith(path),
  );
  const matchesAuthorizationPath = authorizationPath.some((path) =>
    redirectUrl.pathname.startsWith(path),
  );
  const matchesTeacherPath = teacherPaths.some((path) =>
  redirectUrl.pathname.startsWith(path),
);
const matchesStudentPath = studentPaths.some((path) =>
  redirectUrl.pathname.startsWith(path),
);
  const token = await getToken({ req: request });
  if(matchesDefaultPath){
    redirectUrl.pathname = '/auth/sign-in';
  }
  if (!hasSessionToken) {
    redirectUrl.pathname = '/auth/sign-in';
  }
  const isAuthorization = hasSessionToken && matchesAuthorizationPath && !matchesTeacherPath && !matchesStudentPath;
  const isStudent = hasSessionToken && matchesStudentPath && !matchesTeacherPath && token.zone[0] === Role.STUDENT;
  const isTeacher = hasSessionToken && matchesTeacherPath && !matchesStudentPath && token.zone[0] === Role.TEACHER;
  if(isAuthorization){
  if(token.zone[0] === Role.STUDENT){
    redirectUrl.pathname = 'student'
  } 
  if(token.zone[0] === Role.TEACHER){
    redirectUrl.pathname = 'teacher'
  } 
  return NextResponse.redirect(redirectUrl);
}
  if (isStudent || isTeacher) {
    return NextResponse.next();
  }
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|auth/register|auth/sign-in|errors/404).*)',
};
