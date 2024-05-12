import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './constants/Enum/role.enum';

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl;
  const hasSessionToken = request.cookies.has('next-auth.session-token');
  const adminPaths = ['/admin'];
  const teacherPaths = ['/teacher'];
  const matchesAdminPath = adminPaths.some((path) =>
    redirectUrl.pathname.startsWith(path),
  );
  const matchesTeacherPath = teacherPaths.some((path) =>
  redirectUrl.pathname.startsWith(path),
);
  const token = await getToken({ req: request });
  const isAdmin = hasSessionToken && matchesAdminPath && !matchesTeacherPath && token.zone[0] === Role.ADMIN;
  const isTeacher = hasSessionToken && matchesTeacherPath && !matchesAdminPath && token.zone[0] === Role.TEACHER;

  if (isAdmin || isTeacher) {
    return NextResponse.next();
  }
  if (!hasSessionToken) {
    redirectUrl.pathname = '/auth/sign-in';
  } else {
    if (!matchesAdminPath && !matchesTeacherPath ) {
      return NextResponse.next();
    } else {
      redirectUrl.pathname = '/student';
    }
  }

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|auth/register|auth/sign-in|errors/404).*)',
};
